<?php
/**
 * @param $array
 * @param $a = target
 * @param $b = new position
 * 
 * Move array element to new index
 */
function _move_array_element(&$array, $a, $b) {
    $out = array_splice($array, $a, 1);
    array_splice($array, $b, 0, $out);
}
