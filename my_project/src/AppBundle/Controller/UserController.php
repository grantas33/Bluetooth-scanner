<?php

namespace AppBundle\Controller;


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
}