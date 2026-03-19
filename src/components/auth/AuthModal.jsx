import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

function AuthModal() {
    const { signIn, signUp } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!isLogin && password !== confirmPassword) {
                setError('As senhas não coincidem')
                return
            }

            isLogin
                ? await signIn(email, password)
                : await signUp(email, password)

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-col">
            <div className="flex gap-1">
                <button onClick={() => setIsLogin(true)}>Login</button>
                <button onClick={() => setIsLogin(false)}>Registrar</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" />

                <label htmlFor="password">Senha</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />

                {!isLogin && (
                    <>
                        <label htmlFor="confirmPassword">Senha</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" />
                    </>
                )}
                {error && <p className="text-red-500">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
                </button>
            </form>

            <div>
                {/* botão de auth com Google */}
            </div>
        </div>
    )
}


export default AuthModal