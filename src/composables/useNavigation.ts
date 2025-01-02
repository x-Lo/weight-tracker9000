import { useNavigationStore } from '@/stores/navigation';

export function useNavigation() {
  const navigationStore = useNavigationStore();

  // This will use the store's navigateTo action, but avoid passing the router each time
  const navigate = (route: string) => {
    navigationStore.navigateTo(route);
  };

  return { navigate };
}
