namespace Tis4.Services.Usuario.Interfaces.IListarUsuarios;

using Tis4.Models.Usuario.UsuarioModel;

public interface IListarUsuarios{

    public List<UsuarioModel> listarUsuariosCadastrados();

}