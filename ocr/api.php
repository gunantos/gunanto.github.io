<?php

date_default_timezone_set('Asia/Jakarta');
ini_set('max_execution_time', 0);
$base = dirname(dirname(realpath(__FILE__)));
define('BASEPATH', $base.DIRECTORY_SEPARATOR);
define('PAGECALL', realpath(__FILE__));
define('REWRITE', true);

define('APPPATH', BASEPATH.'controller'.DIRECTORY_SEPARATOR);
define('HELPPATH', BASEPATH.'help'.DIRECTORY_SEPARATOR);
define('SYSTEMPATH', BASEPATH.'system'.DIRECTORY_SEPARATOR);
define('PUBLICPATH', BASEPATH.'public'.DIRECTORY_SEPARATOR);
define('CONFIGPATH', BASEPATH.'config'.DIRECTORY_SEPARATOR);
define('LIBPATH', BASEPATH.'library'.DIRECTORY_SEPARATOR);
define('VIEWPATH', BASEPATH.'view'.DIRECTORY_SEPARATOR);



require_once BASEPATH.'system'.DIRECTORY_SEPARATOR.'common.php';
?>