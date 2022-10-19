using Npgsql;
namespace Tis4.Connections.DataBaseConnection;

public class DataBaseConnection{

     public NpgsqlConnection dataBaseConnection() => new NpgsqlConnection("Host=ec2-18-209-78-11.compute-1.amazonaws.com;Username=orwdkvnokzdlgx;Password=36c0872e85041a19e80b185af56f02414c9849d488aabc8e89d9bef7f0971095;Database=d6bm5csi8v348s");

}