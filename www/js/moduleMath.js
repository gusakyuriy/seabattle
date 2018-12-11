//- Поворот точки

function TurnPoint(_objPoint, _xCenter, _yCenter, _angle){
	var _x0=_objPoint.x;
	var _y0=_objPoint.y;

	_objPoint.x = _xCenter + (_x0 - _xCenter) * Math.cos(_angle) - (_y0 - _yCenter) * Math.sin(_angle);
	_objPoint.y = _yCenter + (_y0 - _yCenter) * Math.cos(_angle) + (_x0 - _xCenter) * Math.sin(_angle);
}

