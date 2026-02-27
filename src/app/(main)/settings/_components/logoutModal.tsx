import { SettingsModal } from "./modalIngredients";
import { useLogout } from "@/hooks/useAuth";

export default function LogoutModal() {
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <p className="text-sm text-gray-600">정말 로그아웃 하시겠습니까?</p>

      <SettingsModal.Footer>
        <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          취소
        </SettingsModal.Close>
        <button
          onClick={() => handleLogout()}
          className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer"
        >
          로그아웃
        </button>
      </SettingsModal.Footer>
    </>
  );
}
