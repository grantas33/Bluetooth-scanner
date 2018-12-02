<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Form\RegistrationType;
use AppBundle\Service\FormHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class AuthController extends Controller
{
    /** @var FormHandler */
    private $formHandler;

    /**
     * @var JWTEncoderInterface
     */
    private $jwtEncoder;

    /**
     * AuthController constructor.
     * @param FormHandler $formHandler
     * @param JWTEncoderInterface $jwtEncoder
     */
    public function __construct(FormHandler $formHandler, JWTEncoderInterface $jwtEncoder)
    {
        $this->formHandler = $formHandler;
        $this->jwtEncoder = $jwtEncoder;
    }


    /**
     * @Route("/auth/login", name="login", methods="POST")
     */
    public function loginAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $password = $data['password'];
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(['email' => $email]);
        if (!$user) {
            return new JsonResponse([
                'error_message' => 'Vartotojas nerastas'
            ], Response::HTTP_BAD_REQUEST);
        }
        $isValid = $this->get('security.password_encoder')
            ->isPasswordValid($user, $password);
        if (!$isValid) {
            return new JsonResponse([
                'error_message' => 'Neteisingi prisijungimo duomenys'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $token = $this->getToken($user);
        return new JsonResponse([
            'token' => $token
        ]);
    }

    /**
     * @Route("/auth/register", name="register", methods="POST")
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return JsonResponse
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if (!($form->isSubmitted() && $form->isValid())) {
            $errors = $this->formHandler->getFormErrorArray($form);
            return new JsonResponse([
                'error_message' => $errors
            ], Response::HTTP_BAD_REQUEST);
        }
        try {
            $user->setUsername($user->getEmail());
            $user->setRole(User::ROLE_USER);
            $user->setPassword($encoder->encodePassword($user, $user->getPassword()));
            $em->persist($user);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse([
                'error_message' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'success_message' => 'Successfully registered new user'
        ], Response::HTTP_CREATED);
    }

    public function getToken(User $user)
    {
        try {
            return $this->jwtEncoder
                ->encode([
                    'email' => $user->getEmail()
                ]);
        } catch (JWTEncodeFailureException $e) {
            throw new CustomUserMessageAuthenticationException('Failed to encode the token');
        }
    }
}
