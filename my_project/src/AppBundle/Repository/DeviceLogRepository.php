<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.12.3
 * Time: 14.44
 */

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class DeviceLogRepository extends EntityRepository
{
    public function findLatestLogs()
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.date > :latestPeriod')
            ->setParameter('latestPeriod', new \DateTime('-20 seconds'));

        return $query->getQuery()->getResult();
    }
}