namespace Tis4.Services.Usuario.ListarUsuarios;

using Tis4.Services.Usuario.Interfaces.IListarUsuarios;
using Tis4.Models.Usuario.UsuarioModel;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class ListarUsuarios : IListarUsuarios{

    public List<UsuarioModel> listarUsuariosCadastrados(){
        
        List<UsuarioModel> usuariosCadastrados = new List<UsuarioModel>();
        
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Usuario\" ORDER BY \"nome\" ASC", conn);

        var reader = cmd.ExecuteReader();

        while (reader.Read()){

            UsuarioModel usuarioEncontrado = new UsuarioModel();

            usuarioEncontrado.ID  = (int)reader["id"];
            usuarioEncontrado.nome  = reader["nome"].ToString();
            usuarioEncontrado.email = reader["email"].ToString();
            usuarioEncontrado.senha = reader["senha"].ToString();
            usuarioEncontrado.admin = (bool)reader["admin"];
            
            usuariosCadastrados.Add(usuarioEncontrado);
        }

        conn.Close();

        return usuariosCadastrados;
    }
}