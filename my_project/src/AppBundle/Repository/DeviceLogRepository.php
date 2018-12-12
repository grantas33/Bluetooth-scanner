<?php
/**
 * Created by PhpStorm.
 * User: grantas
 * Date: 18.12.3
 * Time: 14.44
 */

namespace AppBundle\Repository;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

class DeviceLogRepository extends EntityRepository
{
    public function findLatestLogs(User $currentUser)
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.date > :latestPeriod')
            ->andWhere('l.observer = :currentUser')
            ->setParameter('latestPeriod', new \DateTime('-25 seconds'))
            ->setParameter('currentUser', $currentUser);
        return $query->getQuery()->getResult();
    }

    public function findLast100SecondLogs(User $currentUser)
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.date > :lastInterval')
            ->andWhere('l.observer = :currentUser')
            ->setParameter('currentUser', $currentUser)
            ->setParameter('lastInterval', new \DateTime('-100 seconds'))
            ->orderBy('l.date', 'desc');
        return $query->getQuery()->getResult();
    }
}