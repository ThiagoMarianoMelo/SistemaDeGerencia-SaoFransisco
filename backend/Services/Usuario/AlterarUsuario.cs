namespace Tis4.Services.Usuario.AlterarUsuario;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Services.Usuario.Interfaces.IAlterarUsuario;

public class AlterarUsuario : IAlterarUsuario
{
    public void alterarCadastroUsuario(UsuarioModel usuarioAlterado)
    {

        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("UPDATE public.\"Usuario\" SET \"nome\" = @Nome, \"email\" = @Email, \"senha\" = @Senha WHERE \"id\" = @ID", conn);

        cmd.Parameters.AddWithValue("ID", usuarioAlterado.ID);
        cmd.Parameters.AddWithValue("Nome", usuarioAlterado.nome);
        cmd.Parameters.AddWithValue("Email", usuarioAlterado.email);
        cmd.Parameters.AddWithValue("senha",usuarioAlterado.senha);
    
        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
        
    }
}