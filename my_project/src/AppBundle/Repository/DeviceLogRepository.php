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
    /**
     * @param User[] $users
     * @return array
     */
    public function findLatestLogs($users)
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.date > :latestPeriod')
            ->andWhere('l.observer IN (:users)')
            ->setParameter('latestPeriod', new \DateTime('-25 seconds'))
            ->setParameter('users', $users);
        return $query->getQuery()->getResult();
    }

    /**
     * @param User[] $users
     * @return array
     */
    public function findLast100SecondLogs($users)
    {
        $query = $this->createQueryBuilder('l')
            ->andWhere('l.date > :lastInterval')
            ->andWhere('l.observer IN (:users)')
            ->setParameter('users', $users)
            ->setParameter('lastInterval', new \DateTime('-100 seconds'))
            ->orderBy('l.date', 'desc');
        return $query->getQuery()->getResult();
    }
}