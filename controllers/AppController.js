let db = require('../models/dbconexion');

let productos = {
  listar( req, res ){
    let sql = "SELECT * FROM personal1";
    db.query(sql,function(err, result){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }else{
  
        for (var i = result.length - 1; i >= 0; i--) {

          var fecha1=result[i].edad;
          //console.log(fecha1);
          resEdad= productos.calcularEdad(fecha1);
          //console.log(resEdad);
          result[i].edad=resEdad;
        }
        res.json(result);
      }
    });
  },

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;  
  },


  store( req, res ){
    val_nombreApp = req.body.nombreApp;
    val_epellido = req.body.apellido;
    val_sexo   = req.body.sexo;
    val_edad = req.body.edad;
    let sql = "INSERT INTO personal1(nombreApp,apellido,sexo,edad) VALUES(?,?,?,?)";
    db.query(sql,[val_nombreApp,val_epellido,val_sexo,val_edad],function(err, newData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  show( req, res ){
    val_id = req.params.id;
    let sql = "SELECT * FROM personal1 WHERE id=?";
    db.query(sql,[val_id],function(err, rowData){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        res.json(rowData);
      }
    });
  },
  edit( req, res ){
    val_id = req.body.id;
    val_nombreApp = req.body.nombreApp;
    val_sexo   = req.body.sexo;
    val_edad = req.body.edad;
    val_epellido = req.body.apellido;
    let sql = "UPDATE personal1 SET nombreApp=?, sexo=?, edad=?, apellido=? WHERE id=?";
    db.query(sql,[val_nombreApp,val_sexo,val_edad,val_epellido,val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.json(newData);
      }
    });
  },
  delete( req, res ){
    val_id = req.params.id;
    let sql = "DELETE FROM personal1 WHERE id=?";
    db.query(sql,[val_id],function(err, newData){
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
      }
    });
  }
}

module.exports = productos;
