import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe('landing page' ,() => {
    it("renders default error state", ()=>{
        render(<LoginPage/>)
        expect(screen.getByTestId("MSIL")).toHaveTextContent("MSIL R&D")
    })
})