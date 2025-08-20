import React from "react";
import { Shield, Award, Users } from "lucide-react";

export const SafetyCommitment: React.FC = () => {
  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 lg:space-y-8 md:space-y-6 space-y-4 bg-white">
      <h2 className="uppercase text-2xl font-bold text-gray-800">
        Cam kết của chúng tôi đối với sự an toàn của bạn
      </h2>

      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          An toàn là mối quan tâm hàng đầu của Jungle Boss Tours nhằm đảm bảo sức khỏe của cả khách
          hàng và nhân sự trên mọi tour du lịch mạo hiểm.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Thiết bị chuẩn quốc tế</h3>
            <p className="text-gray-600 text-sm">
              100% các thiết bị khám phá hang động đều là của hãng Petzl được nhập khẩu chính ngạch
              từ Pháp
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Kiểm tra định kỳ</h3>
            <p className="text-gray-600 text-sm">
              Thiết bị được các chuyên gia an toàn của Jungle Boss lựa chọn, kiểm tra và bảo trì tỉ
              mỉ định kỳ
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Đội ngũ chuyên nghiệp</h3>
            <p className="text-gray-600 text-sm">
              Hướng dẫn viên và trợ lý an toàn được đào tạo nghiêm ngặt và kiểm tra trình độ định kỳ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
