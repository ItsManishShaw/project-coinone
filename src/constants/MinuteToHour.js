const timeConvert=(n)=> {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return (rhours>0 ? (rhours + " h "):'') +(((rminutes>0)||(!rhours&&rminutes===0))?(rminutes+'m'):" ");
  }
export default timeConvert;