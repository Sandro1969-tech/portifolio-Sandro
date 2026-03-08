async function getProjects() {
    const urlGitHub = "https://api.github.com/users/Sandro1969-tech/repos?sort=created&per_page=100";
    const loadingElement = document.getElementById('loading');
    const container = document.getElementById('meus-projetos-list');

    try {
        const response = await fetch(urlGitHub);
        if (!response.ok) throw new Error('Erro na requisição');
        
        const data = await response.json();
        
        loadingElement.style.display = 'none';
        container.innerHTML = ""; // Limpa o container antes de carregar

        data.forEach(repo => {
            // Cria o elemento de link para o projeto
            const a = document.createElement("a");
            a.href = repo.html_url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            
            // Formata o nome: substitui hifens por espaços e deixa em maiúsculo
            const projectName = repo.name.replace(/-/g, ' ').toUpperCase();
            a.textContent = projectName;
            
            // Adiciona uma pequena descrição se houver (opcional)
            if (repo.description) {
                a.title = repo.description;
            }

            container.appendChild(a);
        });

    } catch (e) {
        console.error("Erro ao procurar projetos:", e);
        loadingElement.textContent = "Não foi possível carregar os projetos no momento.";
    }
}

// Executa a função ao carregar a página
getProjects();