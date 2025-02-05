import type {
  Dashboard,
  DashboardId,
  DashboardCard,
  DashCardId,
  DashCardDataMap,
  ParameterId,
  ParameterValueOrArray,
  DashboardTab,
  DashboardTabId,
} from "metabase-types/api";

export type DashboardSidebarName =
  | "addQuestion"
  | "action"
  | "clickBehavior"
  | "editParameter"
  | "sharing"
  | "info";

interface BaseSidebarState {
  name?: DashboardSidebarName;
  props: Record<string, unknown>;
}

type ClickBehaviorSidebarProps = {
  dashcardId: DashCardId;
};

export interface ClickBehaviorSidebarState extends BaseSidebarState {
  name: "clickBehavior";
  props: ClickBehaviorSidebarProps;
}

type EditParameterSidebarProps = {
  parameterId: ParameterId;
};

export interface EditParameterSidebarState extends BaseSidebarState {
  name: "editParameter";
  props: EditParameterSidebarProps;
}

export type StoreDashboardTab = DashboardTab & {
  isRemoved?: boolean;
};

export type StoreDashboard = Omit<Dashboard, "dashcards" | "tabs"> & {
  dashcards: DashCardId[];
  tabs?: StoreDashboardTab[];
  isDirty?: boolean;
};

export type StoreDashcard = DashboardCard & {
  isAdded?: boolean;
  isDirty?: boolean;
  isRemoved?: boolean;
};

export type SelectedTabId = number | null;

export type TabDeletionId = number;

export type TabDeletion = {
  id: TabDeletionId;
  tabId: DashboardTabId;
  removedDashCardIds: DashCardId[];
};

export interface DashboardState {
  dashboardId: DashboardId | null;
  selectedTabId: SelectedTabId;
  dashboards: Record<DashboardId, StoreDashboard>;

  dashcards: Record<DashCardId, StoreDashcard>;
  dashcardData: DashCardDataMap;

  parameterValues: Record<ParameterId, ParameterValueOrArray>;
  draftParameterValues: Record<ParameterId, ParameterValueOrArray | null>;

  loadingDashCards: {
    loadingIds: DashCardId[];
    loadingStatus: "idle" | "running" | "complete";
    startTime: number | null;
    endTime: number | null;
  };
  loadingControls: {
    documentTitle?: string;
    showLoadCompleteFavicon?: boolean;
  };

  isEditing: Dashboard | null;
  isAddParameterPopoverOpen: boolean;
  isNavigatingBackToDashboard: boolean;

  slowCards: Record<DashCardId, unknown>;

  sidebar: ClickBehaviorSidebarState | BaseSidebarState;

  missingActionParameters: unknown;

  autoApplyFilters: {
    toastId: number | null;
    toastDashboardId: number | null;
  };
  tabDeletions: Record<TabDeletionId, TabDeletion>;
}
