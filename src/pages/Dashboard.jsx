import "./Dashboard.css"

function Dashboard({ user, onLogout }) {

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h1>Finanças</h1>
                </div>

                <nav className="sidebar-nav">

                    <button className="sidebar-item active">
                        <span>⌂</span>
                        Visão geral
                    </button>

                    <button className="sidebar-item">
                        <span>↓</span>
                        Receitas
                    </button>

                    <button className="sidebar-item">
                        <span>↑</span>
                        Despesas
                    </button>

                    <button className="sidebar-item">
                        <span>▣</span>
                        Transações
                    </button>

                </nav>

                <div className="sidebar-bottom">

                    <div className="user-info">

                        <div className="user-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="user-details">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                        </div>

                    </div>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Sair
                    </button>

                </div>

            </aside>

            <main className="dashboard-content">

                <header className="dashboard-header">

                    <div>
                        <h2>Visão geral</h2>
                        <p>Olá, {user.name}! 👋</p>
                    </div>

                    <div className="header-date">
                        Setembro 2026
                    </div>

                </header>

                <section className="summary-grid">

                    <div className="summary-card">

                        <div className="summary-card-header">
                            <span>Saldo atual</span>
                            <span className="summary-icon">R$</span>
                        </div>

                        <strong>R$ 0,00</strong>

                        <p>Saldo disponível</p>

                    </div>

                    <div className="summary-card">

                        <div className="summary-card-header">
                            <span>Receitas</span>
                            <span className="summary-icon">↓</span>
                        </div>

                        <strong>R$ 0,00</strong>

                        <p>Este mês</p>

                    </div>

                    <div className="summary-card">

                        <div className="summary-card-header">
                            <span>Despesas</span>
                            <span className="summary-icon">↑</span>
                        </div>

                        <strong>R$ 0,00</strong>

                        <p>Este mês</p>

                    </div>

                </section>

                <section className="dashboard-grid">

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h3>Últimas transações</h3>
                                <p>Suas movimentações recentes</p>
                            </div>

                            <button className="card-action">
                                Ver todas
                            </button>

                        </div>

                        <div className="empty-state">

                            <div className="empty-icon">
                                +
                            </div>

                            <h4>Nenhuma transação ainda</h4>

                            <p>
                                Quando você adicionar receitas ou despesas,
                                elas aparecerão aqui.
                            </p>

                            <button className="primary-button add-button">
                                Adicionar transação
                            </button>

                        </div>

                    </div>

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h3>Despesas por categoria</h3>
                                <p>Distribuição dos seus gastos</p>
                            </div>

                        </div>

                        <div className="empty-state small">

                            <div className="empty-icon">
                                %
                            </div>

                            <h4>Sem dados ainda</h4>

                            <p>
                                Adicione algumas despesas para visualizar
                                seus gastos por categoria.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    )
}

export default Dashboard