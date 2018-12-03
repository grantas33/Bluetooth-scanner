<?php
/**
 * Created by PhpStorm.
 * User: DockerUser
 * Date: 12/3/2018
 * Time: 1:18 PM
 */

namespace AppBundle\Entity;

class Device implements \JsonSerializable
{
    /**
     * @var 
     */
    private $address;

    /**
     * Specify data which should be serialized to JSON
     * @link https://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.
    }
}