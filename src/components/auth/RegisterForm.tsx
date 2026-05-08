import Button from "../ui/Button"
import { useState, useEffect } from "react"
import Input from "../ui/Input";

type Props = {
  switchToLogin: () => void;
  onSuccess?: () => void;
};

export default function RegisterForm({ switchToLogin }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // Effet pour gérer l'animation de disparition
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setTimeout(() => setError(''), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      };
      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation simple
    if ( !formData.name || !formData.email || !formData.password || !formData.password_confirmation ){
      setError('Veuillez remplir les champs !');
      setLoading(false);
      return;
    }

    // Validation mot de passe
    if ( formData.password !== formData.password_confirmation ){
      setError('Les mots de passes ne correspondent pas !');
      setLoading(false);
      return;
    }

    // Préparer les données
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('password_confirmation', formData.password_confirmation);

    // Check du file
    if(avatarFile){
      data.append('avatar', avatarFile);
    }
  }

  return (
    <>
      {/* Toast notification d'erreur */}
      <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        showError ? 'translate-y-4 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
          <button 
            onClick={() => setShowError(false)}
            className="ml-auto hover:bg-red-600 rounded-full p-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl text-gray-900 font-semibold text-center">
            Sign up to Pochita
          </h2>

          <span className="text-gray-400 text-sm text-center">
            Connect and chat instantly with your friends
          </span>
        </div>

        {/* Avatar upload section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 overflow-hidden">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <label 
              htmlFor="avatar" 
              className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <Input 
          type="text" 
          name_input="name"
          placeholder="Name"
          value={formData.name}
          change={handleInputChange}
        />
        <Input 
          type="email"
          name_input="email"
          placeholder="Email address"
          value={formData.email}
          change={handleInputChange}
        />
        <Input 
          type="password"
          name_input="password"
          placeholder="Password"
          value={formData.password}
          change={handleInputChange}
        />
        <Input 
          type="password"
          name_input="password_confirmation"
          placeholder="Password confirmation" 
          value={formData.password_confirmation}
          change={handleInputChange}
        />

        {loading ? (<Button type="submit">Sending data...</Button>) : (<Button type="submit">Register</Button>)}

        <p className="text-sm text-gray-900">
          Already have an account ?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </>
  )
}