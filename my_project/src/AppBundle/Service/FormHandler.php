<?php

namespace AppBundle\Service;

use Symfony\Component\Form\FormInterface;

class FormHandler
{
    /**
     * @param FormInterface $form
     * @return array
     */
    public function getFormErrorArray(FormInterface $form)
    {
        $errors = [];
        foreach ($form as $child) {
            if (!$child->isValid()) {
                foreach ($child->getErrors() as $error) {
                    $errors[$child->getName()] = $error->getMessage();
                }
            }
        }

        return $errors;
    }
}
