namespace Tis4.Services.Usuario.UsuarioLogin;
using Tis4.Services.Usuario.IUsuarioLogarNoSistema;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Models.Usuario.RequisicaoLogiModel;
using Npgsql;

public class UsuarioLogin : IUsuarioLogarNoSistema{

    public UsuarioModel? logar(RequisicaoLogiModel req){
        
        var conn = new DataBaseConnection().TesteDataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Usuario\" WHERE \"email\" = @Email AND \"senha\" = @Senha", conn);

        cmd.Parameters.AddWithValue("Email", req.email);
        cmd.Parameters.AddWithValue("Senha", req.senha);

        var reader = cmd.ExecuteReader();

        UsuarioModel user = new UsuarioModel();

        if(reader.HasRows){
            reader.Read();

            user.ID    = (int)reader["id"];
            user.nome  = reader["nome"].ToString();
            user.email = reader["email"].ToString();
            user.senha = reader["senha"].ToString();

            conn.Close();

            return user;
        }

        conn.Close();
        return null;

    }
}