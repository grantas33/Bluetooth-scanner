<?php

namespace AppBundle\Controller;


use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends Controller
{
    /**
     * @Route("api/user/current", name="api_user_get_current", methods="GET")
     */
    public function getCurrentUser()
    {
        return new JsonResponse(
            $this->getUser()
        );
    }

    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("api/user/all", name="api_user_get_all", methods="GET")
     */
    public function getAllUsers()
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        return new JsonResponse(
            $users
        );
    }

    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("api/user/all-value-label", name="api_user_get_all_value_label", methods="GET")
     */
    public function getAllUsersAsValueLabel()
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        $valueLabelArray = [];
        /** @var User $user */
        foreach ($users as $user) {
            $valueLabelArray[] = [
                'value' => $user->getId(),
                'label' => $user->getName().' '.$user->getSurname()
            ];
        }
        return new JsonResponse(
            $valueLabelArray
        );
    }
}