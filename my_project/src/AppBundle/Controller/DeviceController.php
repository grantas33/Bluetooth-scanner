<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Device;
use AppBundle\Entity\DeviceLog;
use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DeviceController extends Controller
{

    /**
     * @Route("/api/log", name="log", methods="POST")
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
            if (count($deviceData) < 6) continue;
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
            $deviceLog->setObserver($this->getUser());
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
     * @Route("/api/logs/latest", name="latest-logs", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function getLatestLogsAction(Request $request)
    {
        $usersToFilter = [$this->getUser()];
        $usersToFilterData = json_decode($request->getContent(), true);
      //  var_dump($usersToFilterData);
        if ($this->getUser()->getRole() == User::ROLE_ADMIN && count($usersToFilterData) > 0) {
            $usersToFilter = [];
            foreach ($usersToFilterData as $userToFilter) {
                $usersToFilter[] = $userToFilter['value'];
            }
        }
        $em = $this->getDoctrine()->getManager();
        $latestLogs = $em->getRepository(DeviceLog::class)->findLatestLogs($usersToFilter);
        $uniqueLogsGrouped = [];
        /** @var DeviceLog $log */
        foreach ($latestLogs as $log) {
            $uniqueLogsGrouped[$log->getDevice()->getAddress()][] = $log;
        }
        $uniqueLogs = [];
        foreach ($uniqueLogsGrouped as $logs) {
            $uniqueLogs[] = $logs[0];
        }
        return new JsonResponse([
            $uniqueLogs
        ]);
    }

    /**
     * @Route("/api/logs/first-graph-data", name="first-graph-data-points", methods="POST")
     * @param Request $request
     * @return JsonResponse
     */
    public function getLatest100SecondGraphDataAction(Request $request)
    {
        $usersToFilter = [$this->getUser()];
        $usersToFilterData = json_decode($request->getContent(), true);
        if ($this->getUser()->getRole() == User::ROLE_ADMIN && count($usersToFilterData) > 0) {
            $usersToFilter = [];
            foreach ($usersToFilterData as $userToFilter) {
                $usersToFilter[] = $userToFilter['value'];
            }
        }

        $em = $this->getDoctrine()->getManager();
        $latestLogs = $em->getRepository(DeviceLog::class)->findLast100SecondLogs($usersToFilter);

        $interval = new \DatePeriod(
            new \DateTime('-90 seconds'),
            new \DateInterval('PT10S'),
            new \DateTime()
        );

        $graphDataPoints = [];

        /** @var \DateTime $timePoint */
        foreach ($interval as $timePoint) {
            $timePointString = $timePoint->format("H:i:s");
            $count = 0;
            $before10sec = clone $timePoint;
            $before10sec->modify('-25 seconds');
            $existingDevicesInTimePoint = [];
            /** @var DeviceLog $log */
            foreach ($latestLogs as $log) {
                if ($log->getDate() > $before10sec && $log->getDate() < $timePoint &&
                !in_array($log->getDevice(), $existingDevicesInTimePoint)) {
                    $count++;
                    $existingDevicesInTimePoint[] = $log->getDevice();
                }
            }
            $graphDataPoints[] = [
                'x' => $timePointString,
                'y' => $count
            ];
        }

        return new JsonResponse([
            $graphDataPoints
        ]);
    }
}