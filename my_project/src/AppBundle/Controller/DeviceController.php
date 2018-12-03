<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Device;
use AppBundle\Entity\DeviceLog;
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
        $em = $this->getDoctrine()->getManager();
        //OnePlus 3,OnePlus 3,c0:ee:fb:dc:89:ba,Phone,Smart,12/3/2018 1:14:57 PM,12/3/2018 1:14:57 PM,1,0,100.0%,No,No,No,,
        $data = json_decode($request->getContent(), true);
        $devices = explode("\n", $data['bluetoothContents']);
        foreach ($devices as $device) {
            $deviceData = explode(",", $device);
            $name = $deviceData[0];
            $address = $deviceData[2];
            $type = $deviceData[3];
            $date = $deviceData[5];
            $device = $em->getRepository(Device::class)->find($address);
            if (!$device) {
                $device = new Device();
                $device->setAddress($address);
                $device->setType($type);
                $em->persist($device);
            }
            $deviceLog = new DeviceLog();
            $deviceLog->setDevice($device);
            $deviceLog->setName($name);
            $deviceLog->setDate(\DateTime::createFromFormat('n/j/Y g:i:s A', $date));
            $em->persist($deviceLog);
        }
        $em->flush();

        return new JsonResponse([
            'success_message' => 'Successfully updated device logs'
        ]);
    }

    /**
     * @Route("/api/logs/latest", name="latest-logs", methods="GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function getLatestLogsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $latestLogs = $em->getRepository(DeviceLog::class)->findLatestLogs();
        return new JsonResponse([
            $latestLogs
        ]);
    }
}