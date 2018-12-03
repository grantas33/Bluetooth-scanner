<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="device")
 * @ORM\Entity
 */
class Device implements \JsonSerializable
{
    /**
     *
     * @ORM\Column(type="string")
     * @ORM\Id
     * @var string
     */
    private $address;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="DeviceLog", mappedBy="device")
     */
    private $deviceLogs;

    /**
     * Device constructor.
     */
    public function __construct()
    {
        $this->deviceLogs = new ArrayCollection();
    }


    /**
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param string $address
     * @return Device
     */
    public function setAddress($address)
    {
        $this->address = $address;
        return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Device
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'address' => $this->address,
            'type' => $this->type
        ];
    }
}