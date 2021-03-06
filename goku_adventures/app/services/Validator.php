<?php

/**
 * Nom de la class: Validator()
 *
 * La class Validator() prévoit plusieurs méthodes static destinées à effectuer des contrôles de saisie
 *
 *
 * @author : Kévin Vacherot <kevinvacherot@gmail.com>
 *
 */

 namespace App\Services;

class Validator
{
    public static function isValidMail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function allRequiredValuesNotEmpty($required_values)
    {
        $check = true;

        foreach($required_values as $key => $value){
            if(empty($value)){
                $check = false;
            }
        }

        return $check;
    }

    public static function allRequiredValuesNotNull($required_values)
    {
        $check = true;

        foreach($required_values as $key => $value){
            if(is_null($value)){
                $check = false;
            }
        }

        return $check;
    }

    public static function isValidImage($image_name)
    {
        $fileExtension = strtolower(substr(strrchr($image_name, '.'), 1));
        $arrayExtensionImages = array('jpg', 'jpeg', 'gif', 'png', 'svg');

        return in_array($fileExtension, $arrayExtensionImages);
    }

    public static function compareDate($dateStart, $dateEnd)
    {
        $arrayErrors = array();
        $current_timestamp = time();
        $start_timestamp = strtotime($dateStart);
        $end_timestamp = strtotime($dateEnd);

        if($start_timestamp > $current_timestamp){
            if($end_timestamp > $start_timestamp){
                $return = true;
            } else {
                $arrayErrors['error']['dateEnd_before_dateStart'] = true;
            }
        } else {
            $arrayErrors['error']['dateStart_before_now'] = true;
        }

        return empty($arrayErrors) ? true : $arrayErrors;
    }
}
