import { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard"

function App() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [isRegistering, setIsRegistering] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    useEffect(() => {
        checkSession()
    }, [])

    async function checkSession() {

        try {

            const response = await fetch("http://localhost:8080/api/users/me", {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const userData = await response.json()
                setUser(userData)
            }

        } catch (error) {

            console.error("Erro ao verificar sessão:", error)

        } finally {

            setLoading(false)

        }
    }

    async function handleLogin() {

        setMessage("")
        setError("")
        setFieldErrors({})

        try {

            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Não foi possível fazer login.")
                return
            }

            setUser(data)

        } catch (error) {

            setError("Não foi possível conectar ao servidor.")

        }
    }

    async function handleRegister() {

        setMessage("")
        setError("")
        setFieldErrors({})

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.")
            return
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.")
            return
        }

        try {

            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            const data = await response.json()

            if (!response.ok) {

                if (response.status === 400) {
                    setFieldErrors(data)
                } else {
                    setError(data.error || "Não foi possível criar a conta.")
                }

                return
            }

            setMessage("Conta criada com sucesso!")

            setIsRegistering(false)

            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")

        } catch (error) {

            setError("Não foi possível conectar ao servidor.")

        }
    }

    async function handleLogout() {

        setError("")

        try {

            const response = await fetch("http://localhost:8080/api/users/logout", {
                method: "POST",
                credentials: "include"
            })

            if (response.ok) {
                setUser(null)
            } else {
                setError("Não foi possível sair da conta.")
            }

        } catch (error) {

            setError("Não foi possível conectar ao servidor.")

        }
    }

    function handleSubmit() {

        if (isRegistering) {
            handleRegister()
        } else {
            handleLogin()
        }
    }

    function switchToRegister() {

        setIsRegistering(true)
        setMessage("")
        setError("")
        setFieldErrors({})
    }

    function switchToLogin() {

        setIsRegistering(false)
        setMessage("")
        setError("")
        setFieldErrors({})
    }

    if (loading) {
        return (
            <div className="page">
                <p>Carregando...</p>
            </div>
        )
    }

    if (user) {
        return (
            <Dashboard
                user={user}
                onLogout={handleLogout}
            />
        )
    }

    return (
        <div className="page">

            <div className="login-box">

                <h1>Finanças</h1>

                <p>
                    {isRegistering
                        ? "Crie sua conta"
                        : "Entre na sua conta"
                    }
                </p>

                <div className="login-container">

                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                            {fieldErrors.name && (
                                <p className="error-message">
                                    {fieldErrors.name}
                                </p>
                            )}
                        </>
                    )}

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    {isRegistering && fieldErrors.email && (
                        <p className="error-message">
                            {fieldErrors.email}
                        </p>
                    )}

                    <div className="password-container">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword
                                    ? "Ocultar senha"
                                    : "Mostrar senha"
                            }
                        >
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                    <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 4 10 7-0.4 1.1-1.3 2.5-2.5 3.7" />
                                    <path d="M6.2 6.2C4.4 7.3 3.1 9 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.7" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>

                    </div>

                    {password.length > 0 && password.length < 6 && (
                        <p className="password-warning">
                            A senha deve ter pelo menos 6 caracteres.
                        </p>
                    )}

                    {isRegistering && fieldErrors.password && (
                        <p className="error-message">
                            {fieldErrors.password}
                        </p>
                    )}

                    {isRegistering && (
                        <>
                            <div className="password-container">

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirme sua senha"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Ocultar confirmação da senha"
                                            : "Mostrar confirmação da senha"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                            <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 4 10 7-0.4 1.1-1.3 2.5-2.5 3.7" />
                                            <path d="M6.2 6.2C4.4 7.3 3.1 9 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.7" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>

                            </div>

                            {confirmPassword.length > 0 &&
                                password !== confirmPassword && (
                                    <p className="password-warning">
                                        As senhas não coincidem.
                                    </p>
                                )
                            }
                        </>
                    )}

                    <button
                        className="primary-button"
                        onClick={handleSubmit}
                    >
                        {isRegistering ? "Criar conta" : "Entrar"}
                    </button>

                </div>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {isRegistering ? (
                    <button
                        className="register-button"
                        onClick={switchToLogin}
                    >
                        Voltar para login
                    </button>
                ) : (
                    <button
                        className="register-button"
                        onClick={switchToRegister}
                    >
                        Criar uma conta
                    </button>
                )}

            </div>

        </div>
    )
}

export default App