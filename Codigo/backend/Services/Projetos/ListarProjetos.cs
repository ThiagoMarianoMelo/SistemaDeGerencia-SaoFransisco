namespace Tis4.Services.Projetos.ListarProjetos;

using System.Collections.Generic;
using Tis4.Models.Instituicao.InstituicaoModel;
using Tis4.Models.Projeto.ProjetoModel;
using Tis4.Services.Projetos.Interfaces.IListarProjetos;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class ListarProjetos : IListarProjetos
{
    public List<ProjetoModel> listarProjetosPorInstituicao(InstituicaoModel instituicaoResponsavel)
    {
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Projeto\" WHERE \"IDInstituicao\" = @IDInstituicao", conn);

        cmd.Parameters.AddWithValue("IDInsituicao", instituicaoResponsavel.ID);

        var reader = cmd.ExecuteReader();

        List<ProjetoModel> projetos = new List<ProjetoModel>();

        while(reader.Read()){

            ProjetoModel projetoEncontrado = new ProjetoModel();

            //atribuicao aos atributos do model

            projetos.Add(projetoEncontrado);
        }

        conn.Close();

        return projetos;
    }
}