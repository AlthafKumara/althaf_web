Project Architecture: Feature-Based Modular
This project follows a Feature-Based Modular Architecture. This structure is designed to keep the codebase scalable, easy to maintain, and organized by business logic (domain) rather than just technical types.

📁 Global Directory Structure
Plaintext
src/
├── assets/       # Static assets (images, fonts, global styles)
├── components/   # Shared UI components (Atomic design: Button, Input, Modal)
├── config/       # Global configuration (Environment variables, constants)
├── features/     # CORE BUSINESS LOGIC (Modular domains)
├── hooks/        # Global custom hooks (useTheme, useLocalStorage)
├── layouts/      # Layout templates (MainLayout, AuthLayout, DashboardLayout)
├── lib/          # External library configurations (Axios instance, Supabase client)
├── pages/        # Route entry points (Responsible for composition only)
├── services/     # Global API services or 3rd party integrations
├── types/        # Global TypeScript definitions and interfaces
└── utils/        # General helper functions (formatters, validators)
🚀 The features/ Directory
The features folder is the heart of the application. Each sub-folder represents a specific domain or functionality. A feature should be self-contained as much as possible.

Example: features/auth
Plaintext
auth/
├── api/           # API request functions specific to authentication
├── components/    # UI components used only within this feature
├── hooks/         # Logic/state management hooks specific to auth
├── types/         # TypeScript types specific to auth
└── index.ts       # Public API: Exports what other parts of the app can use
📝 Implementation Example
1. API Layer (features/auth/api/login.ts)
TypeScript
import { axios } from '@/lib/axios';
import { LoginCredentials, AuthResponse } from '../types';

export const loginWithEmail = (data: LoginCredentials): Promise<AuthResponse> => {
  return axios.post('/auth/login', data);
};
2. Logic Layer (features/auth/hooks/useLogin.ts)
TypeScript
import { useMutation } from '@tanstack/react-query';
import { loginWithEmail } from '../api/login';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (response) => {
      // Handle success (e.g., save token, redirect)
    },
  });
};
3. UI Layer (features/auth/components/LoginForm.tsx)
TypeScript
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const { mutate, isLoading } = useLogin();

  const handleOnSubmit = (values) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {/* Form Fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Authenticating...' : 'Login'}
      </button>
    </form>
  );
};
4. Public API (features/auth/index.ts)
This file acts as a gatekeeper. It ensures that other features only access what is intentionally exposed.

TypeScript
export * from './components/LoginForm';
export * from './hooks/useUserSession';
export * from './types';
🚥 Golden Rules
Strict Isolation: Never import from a feature's internal folders directly.

❌ import { LoginForm } from '@/features/auth/components/LoginForm'

✅ import { LoginForm } from '@/features/auth'

Thin Pages: Folders in pages/ should contain minimal logic. They should primarily import components from features/ and layouts/ to assemble a screen.

Cross-Feature Imports: If Feature A needs something from Feature B, it must import it through Feature B's index.ts.

Shared vs. Feature: If a component is used across multiple features (e.g., a generic Spinner), it belongs in src/components/. If it's specific to one domain (e.g., BookCard), it belongs in features/books/components/.

🛠️ Refactoring Strategy
Step 1: Create the folder structure.

Step 2: Configure Path Aliases (e.g., @/*) in tsconfig.json to avoid deep relative paths (../../../../).

Step 3: Group your existing code into domain-based folders inside features/.

Step 4: Create index.ts files for each feature to clean up your import statements.