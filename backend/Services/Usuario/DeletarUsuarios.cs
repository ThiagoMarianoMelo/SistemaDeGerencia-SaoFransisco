namespace Tis4.Services.Usuario.DeletarUsuario;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Services.Usuario.Interfaces.IDeletarUsuarios;

public class DeletarUsuario : IDeletarUsuarios
{
    public void deleteUser(int id){

        var conn = new DataBaseConnection().dataBaseConnection();
        
        conn.Open();

        var cmd = new NpgsqlCommand("DELETE FROM public.\"Usuario\" WHERE id = @ID", conn);

        cmd.Parameters.AddWithValue("ID", id);

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
        
    }
}