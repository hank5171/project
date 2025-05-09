package com.example.demo.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//建立 server 與 client 再傳送資料上的統一結構與標準(含錯誤)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
	//private Integer status;	// 狀態 例如:200, 400
	private String message;	// 訊息 例如:查詢成功, 新增成功, 計算成功...
	T data;					// payload 實際資料
	
	// 成功回應
	public static <T> ApiResponse<T> success(String meassage, T data){
		return new ApiResponse<T>(meassage,data);
	}
	
	// 失敗回應
	public static <T> ApiResponse<T> error(String meassage){
		return new ApiResponse<T>(meassage,null);
	}
}