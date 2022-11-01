using Microsoft.AspNetCore.Mvc;
using Tis4.Services.Usuario.UsuarioLogin;
using Tis4.Models.Usuario.RequisicaoLogiModel;
using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Services.Usuario.Interfaces.IUsuarioLogarNoSistema;
using Tis4.Services.Usuario.Interfaces.IListarUsuarios;
using Tis4.Services.Usuario.ListarUsuarios;
using Tis4.Services.Usuario.Interfaces.IDeletarUsuarios;
using Tis4.Services.Usuario.DeletarUsuario;
using Tis4.Services.Usuario.Interfaces.IAlterarUsuario;
using Tis4.Services.Usuario.AlterarUsuario;

namespace Tis4.Controllers.Usuario.UserControllers;

public class UsuarioController : ControllerBase
{

    public IUsuarioLogarNoSistema usuarioLogarNoSistemaRules;
    public IListarUsuarios listarUsuariosCadastrados;
    public IAlterarUsuario alterarDadosUsuario;
    public IDeletarUsuarios deletarUsuario;


    public UsuarioController(){
    
        usuarioLogarNoSistemaRules = new UsuarioLogin();
        listarUsuariosCadastrados = new ListarUsuarios();
        deletarUsuario = new DeletarUsuario();
        alterarDadosUsuario = new AlterarUsuario();
    }

    [HttpGet]
    [Route("/Usuarios")]
    public List<UsuarioModel> ListarUsuarios() => listarUsuariosCadastrados.listarUsuariosCadastrados();

    [HttpPost]
    [Route("/Login")]
    public UsuarioModel? Login([FromBody] RequisicaoLogiModel req) => usuarioLogarNoSistemaRules.logar(req);

    [HttpDelete]
    [Route("/Usuarios")]
    public void DeletarUsuario([FromQuery] int id) => deletarUsuario.deleteUser(id);

    [HttpPut]
    [Route("/Usuarios")]
    public void AlterarDadosUsuario([FromBody] UsuarioModel usuarioAlterado) => alterarDadosUsuario.alterarCadastroUsuario(usuarioAlterado);

}
