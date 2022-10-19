using Microsoft.AspNetCore.Mvc;
using Tis4.Services.Usuario.UsuarioLogin;
using Tis4.Models.Usuario.RequisicaoLogiModel;
using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Services.Usuario.IUsuarioLogarNoSistema;

namespace Tis4.Controllers.Usuario.UserControllers;

public class UsuarioController : ControllerBase
{

    public IUsuarioLogarNoSistema usuarioLogarNoSistemaRules;


    public UsuarioController(){
    
        usuarioLogarNoSistemaRules = new UsuarioLogin();
    }

    [HttpPost]
    [Route("/Login")]
    public UsuarioModel? Login([FromBody] RequisicaoLogiModel req) => usuarioLogarNoSistemaRules.logar(req);
}
