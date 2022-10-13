using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Models.Usuario.RequisicaoLogiModel;
namespace Tis4.Services.Usuario.IUsuarioLogarNoSistema;
public interface IUsuarioLogarNoSistema{

    public UsuarioModel? logar(RequisicaoLogiModel req);
}