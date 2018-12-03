<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DeviceController extends Controller
{

    /**
     * @Route("/auth/log", name="log", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function logAction(Request $request)
    {
        //OnePlus 3,OnePlus 3,c0:ee:fb:dc:89:ba,Phone,Smart,12/3/2018 1:14:57 PM,12/3/2018 1:14:57 PM,1,0,100.0%,No,No,No,,
        $data = json_decode($request->getContent(), true);
        $devices = explode("\n", $data['bluetoothContents']);
        foreach ($devices as $device) {
            $deviceData = explode(",", $device);
            $name = $deviceData[0];
            $address = $deviceData[2];
            $type = $deviceData[3];
            $date = $deviceData[5];

        }
        var_dump($data);

        return new JsonResponse(['data' => $data]);
    }
}