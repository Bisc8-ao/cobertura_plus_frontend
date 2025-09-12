import { vi } from "vitest";
import "@testing-library/jest-dom";
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Mock do canvas **imediato**
HTMLCanvasElement.prototype.getContext = function () {
    return {
        fillStyle: "",
        strokeStyle: "",
        lineWidth: 1,
        globalAlpha: 1,
        fillRect: () => {},
        clearRect: () => {},
        getImageData: () => ({ data: [] }),
        putImageData: () => {},
        createImageData: () => [],
        setTransform: () => {},
        drawImage: () => {},
        save: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        stroke: () => {},
        fill: () => {},
        arc: () => {},
        fillText: () => {},
        measureText: () => ({ width: 0 }),
        transform: () => {},
        rotate: () => {},
        scale: () => {},
        translate: () => {},
        drawFocusIfNeeded: () => {},
        setLineDash: () => {},
        getLineDash: () => [],
        strokeRect: () => {},
        clip: () => {},
    };
};

// Mock do Lottie
vi.mock("lottie-web", () => ({
    loadAnimation: () => ({
        play: () => {},
        stop: () => {},
        destroy: () => {},
    }),
}));
