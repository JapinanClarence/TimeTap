import type { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
};

export type AuthLayoutProps = {
    children: ReactNode;
};

export type AppLayoutProps ={
    children: ReactNode;
    showHeader?: boolean
}