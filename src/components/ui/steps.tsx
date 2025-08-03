import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, AlertCircle } from "lucide-react";

// Interface cho Steps component chính
interface StepsProps {
  current: number; // Bước hiện tại (bắt đầu từ 0)
  status?: "wait" | "process" | "finish" | "error"; // Trạng thái tổng thể
  size?: "default" | "small"; // Kích thước component
  direction?: "horizontal" | "vertical"; // Hướng hiển thị
  labelPlacement?: "horizontal" | "vertical"; // Vị trí label
  className?: string;
  children: React.ReactNode;
  onChange?: (current: number) => void; // Callback khi click vào step
}

// Interface cho mỗi Step item
interface StepProps {
  title: string; // Tiêu đề bước
  description?: string; // Mô tả chi tiết
  status?: "wait" | "process" | "finish" | "error"; // Trạng thái riêng
  icon?: React.ReactNode; // Icon tùy chỉnh
  disabled?: boolean; // Vô hiệu hóa step
  className?: string;
}

// Context để chia sẻ state giữa các component
interface StepsContextType {
  current: number;
  status: "wait" | "process" | "finish" | "error";
  size: "default" | "small";
  direction: "horizontal" | "vertical";
  labelPlacement: "horizontal" | "vertical";
  onChange?: (current: number) => void;
  stepsCount: number;
}

const StepsContext = React.createContext<StepsContextType>({
  current: 0,
  status: "process",
  size: "default",
  direction: "horizontal",
  labelPlacement: "horizontal",
  stepsCount: 0,
});

// Component Steps chính
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      current = 0,
      status = "process",
      size = "default",
      direction = "horizontal",
      labelPlacement = "horizontal",
      className,
      children,
      onChange,
      ...props
    },
    ref
  ) => {
    // Đếm số lượng step con
    const stepsCount = React.Children.count(children);

    const contextValue: StepsContextType = {
      current,
      status,
      size,
      direction,
      labelPlacement,
      onChange,
      stepsCount,
    };

    return (
      <StepsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "steps-container",
            direction === "vertical" ? "flex flex-col" : "flex items-start",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepsContext.Provider>
    );
  }
);
Steps.displayName = "Steps";

// Component Step đơn lẻ
const Step = React.forwardRef<HTMLDivElement, StepProps & { stepIndex?: number }>(
  (
    {
      title,
      description,
      status: stepStatus,
      icon,
      disabled = false,
      className,
      stepIndex = 0,
      ...props
    },
    ref
  ) => {
    const {
      current,
      status: globalStatus,
      size,
      direction,
      labelPlacement,
      onChange,
      stepsCount,
    } = React.useContext(StepsContext);

    // Xác định trạng thái thực tế của step
    const getStepStatus = (): "wait" | "process" | "finish" | "error" => {
      if (stepStatus) return stepStatus;

      if (stepIndex < current) return "finish";
      if (stepIndex === current) return globalStatus;
      return "wait";
    };

    const actualStatus = getStepStatus();
    const isLast = stepIndex === stepsCount - 1;

    // Xử lý click vào step
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(stepIndex);
      }
    };

    // Render icon dựa trên trạng thái
    const renderIcon = () => {
      if (icon) return icon;

      switch (actualStatus) {
        case "finish":
          return <Check className="w-4 h-4" />;
        case "error":
          return <X className="w-4 h-4" />;
        case "process":
          return <AlertCircle className="w-4 h-4" />;
        default:
          return <span className="text-sm font-medium">{stepIndex + 1}</span>;
      }
    };

    // Classes cho step circle
    const circleClasses = cn(
      "flex items-center justify-center rounded-full border-2 transition-all duration-200",
      size === "small" ? "w-8 h-8" : "w-10 h-10",
      {
        // Trạng thái wait
        "bg-white border-gray-300 text-gray-400": actualStatus === "wait",
        // Trạng thái process
        "bg-blue-500 border-blue-500 text-white shadow-blue-200 shadow-md":
          actualStatus === "process",
        // Trạng thái finish
        "bg-green-500 border-green-500 text-white": actualStatus === "finish",
        // Trạng thái error
        "bg-red-500 border-red-500 text-white": actualStatus === "error",
        // Disabled state
        "opacity-50 cursor-not-allowed": disabled,
        // Clickable
        "cursor-pointer hover:scale-105": !disabled && onChange,
      }
    );

    // Classes cho connector line
    const connectorClasses = cn(
      "transition-all duration-300 mt-4",
      direction === "horizontal" ? "flex-1 h-0.5 mx-4" : "w-0.5 h-8 my-2 ml-4",
      {
        "bg-green-500": actualStatus === "finish",
        "bg-blue-500": actualStatus === "process" && stepIndex < current,
        "bg-gray-300":
          actualStatus === "wait" || (actualStatus === "process" && stepIndex >= current),
      }
    );

    return (
      <div
        ref={ref}
        className={cn(
          "step-item",
          direction === "horizontal" ? "flex items-start flex-1" : "flex flex-col w-full",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {direction === "horizontal" ? (
          // Layout ngang
          <>
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div className={circleClasses}>{renderIcon()}</div>

              {/* Labels */}
              {labelPlacement === "vertical" && (
                <div className="mt-2 text-center max-w-[120px]">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      actualStatus === "process"
                        ? "text-blue-600"
                        : actualStatus === "finish"
                          ? "text-green-600"
                          : actualStatus === "error"
                            ? "text-red-600"
                            : "text-gray-500"
                    )}
                  >
                    {title}
                  </div>
                  {description && <div className="text-xs text-gray-400 mt-1">{description}</div>}
                </div>
              )}
            </div>

            {/* Connector line */}
            {!isLast && <div className={connectorClasses} />}

            {/* Labels ngang */}
            {labelPlacement === "horizontal" && (
              <div className="ml-3 min-w-0 flex-1">
                <div
                  className={cn(
                    "text-sm font-medium",
                    actualStatus === "process"
                      ? "text-blue-600"
                      : actualStatus === "finish"
                        ? "text-green-600"
                        : actualStatus === "error"
                          ? "text-red-600"
                          : "text-gray-500"
                  )}
                >
                  {title}
                </div>
                {description && <div className="text-xs text-gray-400 mt-1">{description}</div>}
              </div>
            )}
          </>
        ) : (
          // Layout dọc
          <div className="flex items-start w-full">
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div className={circleClasses}>{renderIcon()}</div>

              {/* Connector line */}
              {!isLast && <div className={connectorClasses} />}
            </div>

            {/* Labels */}
            <div className="ml-3 flex-1 pb-8">
              <div
                className={cn(
                  "text-sm font-medium",
                  actualStatus === "process"
                    ? "text-blue-600"
                    : actualStatus === "finish"
                      ? "text-green-600"
                      : actualStatus === "error"
                        ? "text-red-600"
                        : "text-gray-500"
                )}
              >
                {title}
              </div>
              {description && <div className="text-xs text-gray-400 mt-1">{description}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Step.displayName = "Step";

// HOC để tự động inject stepIndex
const StepsWithIndexedChildren = ({ children, ...props }: StepsProps) => {
  const indexedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === Step) {
      return React.cloneElement(child as React.ReactElement<any>, { stepIndex: index });
    }
    return child;
  });

  return <Steps {...props}>{indexedChildren}</Steps>;
};

export { StepsWithIndexedChildren as Steps, Step };
