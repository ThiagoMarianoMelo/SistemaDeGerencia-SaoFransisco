namespace Tis4.Services.Usuario.Interfaces.IUsuarioLogarNoSistema;

using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Models.Usuario.RequisicaoLogiModel;
public interface IUsuarioLogarNoSistema{

    public UsuarioModel? logar(RequisicaoLogiModel req);
}