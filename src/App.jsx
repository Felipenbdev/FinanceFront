import { useState } from "react"

function App() {
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <div className="page">
            <div className="login-box">
                <h1>Finanças</h1>

                <p>
                    {isRegistering ? "Crie sua conta" : "Entre na sua conta"}
                </p>

                <div className="login-container">
                    {isRegistering && (
                        <input
                            type="text"
                            placeholder="Nome"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="E-mail"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                    />

                    {isRegistering && (
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                        />
                    )}

                    <button className="primary-button">
                        {isRegistering ? "Criar conta" : "Entrar"}
                    </button>
                </div>

                {isRegistering ? (
                    <button
                        className="register-button"
                        onClick={() => setIsRegistering(false)}
                    >
                        Voltar para login
                    </button>
                ) : (
                    <button
                        className="register-button"
                        onClick={() => setIsRegistering(true)}
                    >
                        Criar uma conta
                    </button>
                )}
            </div>
        </div>
    )
}

export default App