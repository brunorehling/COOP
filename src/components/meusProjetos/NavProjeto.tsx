interface NavProjectProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function NavProject({ activeTab, setActiveTab }: NavProjectProps) {
  const tabs = [
    {
      id: "visaoGeral",
      label: "Visão Geral",
      icon: "/home_not_selected.png",
      iconActive: "/home_selected.png",
    },
    {
      id: "tarefas",
      label: "Tarefas",
      icon: "/tasks.png",
      iconActive: "/tasks.png",
    },
    {
      id: "equipe",
      label: "Equipe",
      icon: "/team_not_selected.png",
      iconActive: "/team_selected.png",
    },
    {
      id: "links",
      label: "links",
      icon: "/links.png",
      iconActive: "/links.png",
    },
  ];

  return (
    <nav className="flex justify-center gap-10 border-b border-gray-600 py-4 bg-[#1A2333]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 text-lg font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "text-white border-b-2 border-[#e64eeb]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <img
            src={activeTab === tab.id ? tab.iconActive : tab.icon}
            alt={tab.label}
            className="w-6 h-6 object-contain"
          />
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
