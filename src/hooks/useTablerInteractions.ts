import { useEffect } from "react";

type Cleanup = () => void;

type TooltipState = {
  node: HTMLDivElement | null;
  target: HTMLElement | null;
  title: string | null;
};

const createTooltipNode = () => {
  const node = document.createElement("div");
  node.className = "tooltip bs-tooltip-auto show";
  node.style.position = "fixed";
  node.style.zIndex = "1080";
  node.style.pointerEvents = "none";
  const inner = document.createElement("div");
  inner.className = "tooltip-inner";
  node.appendChild(inner);
  document.body.appendChild(node);
  return node;
};

const positionTooltip = (node: HTMLDivElement, target: HTMLElement) => {
  const rect = target.getBoundingClientRect();
  const tooltipRect = node.getBoundingClientRect();
  const top = Math.max(8, rect.top - tooltipRect.height - 8);
  const left = Math.min(
    Math.max(8, rect.left + rect.width / 2 - tooltipRect.width / 2),
    window.innerWidth - tooltipRect.width - 8
  );
  node.style.top = `${top}px`;
  node.style.left = `${left}px`;
};

const initDropdowns = () => {
  const openDropdowns = new Set<HTMLElement>();

  const closeDropdown = (dropdown: HTMLElement) => {
    dropdown.classList.remove("show");
    const menu = dropdown.querySelector<HTMLElement>(".dropdown-menu");
    if (menu) {
      menu.classList.remove("show");
      menu.removeAttribute("data-bs-popper");
    }
    const toggle = dropdown.querySelector<HTMLElement>("[data-bs-toggle=\"dropdown\"]");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    openDropdowns.delete(dropdown);
  };

  const closeAll = (except?: HTMLElement) => {
    openDropdowns.forEach((dropdown) => {
      if (dropdown !== except) closeDropdown(dropdown);
    });
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const toggle = target.closest<HTMLElement>("[data-bs-toggle=\"dropdown\"]");
    if (toggle) {
      event.preventDefault();
      const dropdown = toggle.closest<HTMLElement>(".dropdown, .btn-group");
      if (!dropdown) return;
      const menu = dropdown.querySelector<HTMLElement>(".dropdown-menu");
      if (!menu) return;
      const isOpen = dropdown.classList.contains("show");
      if (isOpen) {
        closeDropdown(dropdown);
        return;
      }
      closeAll(dropdown);
      dropdown.classList.add("show");
      menu.classList.add("show");
      menu.setAttribute("data-bs-popper", "static");
      toggle.setAttribute("aria-expanded", "true");
      openDropdowns.add(dropdown);
      return;
    }

    const clickedInside = target.closest<HTMLElement>(".dropdown, .btn-group");
    if (!clickedInside) closeAll();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeAll();
  };

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeyDown);

  return () => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeyDown);
    openDropdowns.forEach((dropdown) => closeDropdown(dropdown));
  };
};

const initModals = () => {
  const openModals = new Map<HTMLElement, HTMLDivElement>();

  const openModal = (modal: HTMLElement) => {
    if (openModals.has(modal)) return;
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-modal", "true");
    modal.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade show";
    backdrop.addEventListener("click", () => closeModal(modal));
    document.body.appendChild(backdrop);
    openModals.set(modal, backdrop);
  };

  const closeModal = (modal: HTMLElement) => {
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    const backdrop = openModals.get(modal);
    if (backdrop) backdrop.remove();
    openModals.delete(modal);
    if (openModals.size === 0) document.body.style.overflow = "";
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const toggle = target.closest<HTMLElement>("[data-bs-toggle=\"modal\"]");
    if (toggle) {
      event.preventDefault();
      const selector = toggle.getAttribute("data-bs-target") || toggle.getAttribute("href");
      if (!selector) return;
      const modal = document.querySelector<HTMLElement>(selector);
      if (modal) openModal(modal);
      return;
    }

    const dismiss = target.closest<HTMLElement>("[data-bs-dismiss=\"modal\"]");
    if (dismiss) {
      event.preventDefault();
      const modal = dismiss.closest<HTMLElement>(".modal");
      if (modal) closeModal(modal);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      openModals.forEach((_, modal) => closeModal(modal));
    }
  };

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeyDown);

  return () => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeyDown);
    openModals.forEach((_, modal) => closeModal(modal));
  };
};

const initCollapse = () => {
  const toggleTargets = (toggle: HTMLElement) => {
    const selector = toggle.getAttribute("data-bs-target") || toggle.getAttribute("href");
    if (!selector) return;
    const targets = document.querySelectorAll<HTMLElement>(selector);
    targets.forEach((target) => {
      if (target.id === "sidebar-menu") {
        const isMobile = window.innerWidth <= 1024;
        if (isMobile) {
          const isOpen = document.body.classList.contains("sidebar-open");
          if (isOpen) {
            document.body.classList.remove("sidebar-open");
            target.classList.remove("show");
            toggle.setAttribute("aria-expanded", "false");
          } else {
            document.body.classList.add("sidebar-open");
            target.classList.add("show");
            toggle.setAttribute("aria-expanded", "true");
          }
          return;
        }
        const isCollapsed = document.body.classList.contains("sidebar-collapsed");
        if (isCollapsed) {
          document.body.classList.remove("sidebar-collapsed");
          target.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
        } else {
          document.body.classList.add("sidebar-collapsed");
          target.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
        return;
      }
      const isOpen = target.classList.contains("show");
      const parentSelector = target.getAttribute("data-bs-parent");
      if (!isOpen && parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
          parent.querySelectorAll<HTMLElement>(".collapse.show").forEach((open) => {
            open.classList.remove("show");
          });
        }
      }
      target.classList.toggle("show", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      if (target.id === "sidebar-menu") {
        document.body.classList.toggle("sidebar-collapsed", isOpen);
      }
    });
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const toggle = target.closest<HTMLElement>("[data-bs-toggle=\"collapse\"]");
    if (!toggle) return;
    event.preventDefault();
    toggleTargets(toggle);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
};

const initTooltips = () => {
  const state: TooltipState = { node: null, target: null, title: null };

  const showTooltip = (target: HTMLElement) => {
    const title = target.getAttribute("title");
    if (!title) return;
    target.setAttribute("data-original-title", title);
    target.removeAttribute("title");
    if (!state.node) state.node = createTooltipNode();
    const inner = state.node.querySelector<HTMLElement>(".tooltip-inner");
    if (!inner) return;
    inner.textContent = title;
    state.target = target;
    state.title = title;
    positionTooltip(state.node, target);
  };

  const hideTooltip = (target?: HTMLElement) => {
    if (target && target !== state.target) return;
    if (state.target && state.title) {
      state.target.setAttribute("title", state.title);
    }
    if (state.node) {
      state.node.remove();
      state.node = null;
    }
    state.target = null;
    state.title = null;
  };

  const onMouseOver = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-bs-toggle=\"tooltip\"]");
    if (!target) return;
    showTooltip(target);
  };

  const onMouseOut = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-bs-toggle=\"tooltip\"]");
    if (!target) return;
    hideTooltip(target);
  };

  const onScroll = () => {
    hideTooltip();
  };

  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);
  window.addEventListener("scroll", onScroll, true);

  return () => {
    document.removeEventListener("mouseover", onMouseOver);
    document.removeEventListener("mouseout", onMouseOut);
    window.removeEventListener("scroll", onScroll, true);
    hideTooltip();
  };
};

const initTablerInteractions = (): Cleanup => {
  const cleanups = [initDropdowns(), initModals(), initCollapse(), initTooltips()];
  return () => cleanups.forEach((cleanup) => cleanup());
};

export const useTablerInteractions = () => {
  useEffect(() => initTablerInteractions(), []);
};
