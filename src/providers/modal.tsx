"use client";

import { createContext, ReactNode, useState } from "react";
import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";
import { Modal } from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setTicketDetail: (detail: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setTicketDetail(detail: TicketInfo) {
    setTicket(detail);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setTicketDetail }}
    >
      {visible && <Modal />}

      {children}
    </ModalContext.Provider>
  );
};
