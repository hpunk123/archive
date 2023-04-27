
const catalogoRoles = 'SELECT * FROM ce_cat_roles WHERE rol_activo = 1'
const catalogoUbicaciones = 'SELECT * FROM ce_cat_ubicaciones WHERE activo_ubicacion = 1'
const newUser = 'INSERT INTO ce_tbl_usuarios SET ?'
const loginUser ='SELECT * FROM ce_tbl_usuarios WHERE username = ?'
const deserializeUser = 'SELECT * FROM ce_tbl_usuarios WHERE id_usuario = ?'

module.exports = { catalogoRoles,catalogoUbicaciones,newUser,loginUser,deserializeUser }