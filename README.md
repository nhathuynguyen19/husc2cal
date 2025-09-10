# HUSC-To-Calendar

Bạn quá mỏi mệt với việc mỗi lúc đi học lại phải check [thời khóa biểu trên trang tín chỉ](https://student.husc.edu.vn)? Bạn tưởng viết ra và dán lên tường là xong… nhưng bất ngờ chưa, giờ bạn đang đứng giữa trường và không biết nên đi dãy nào, phòng nào…  

Nếu bạn đã thêm lịch vào điện thoại, chúc mừng! Đây là phương pháp tối ưu nhất: thêm 1 lần và sử dụng xuyên suốt học kỳ (ngoại trừ những lúc thầy cô cho nghỉ hoặc thay đổi lịch :>>).  

Nhưng để thêm lịch lần đầu thì khá mất thời gian, cho nên **tool này sẽ giúp bạn tiết kiệm thời gian**, chuyển lịch học từ trang tín chỉ sang **Google Calendar, iCloud Calendar,...** chỉ trong ~1 phút 30 giây.  

Let's dive into it! 🚀

## Các bước thực hiện

### Bước 1: Đăng nhập vào trang tín chỉ
Truy cập [student.husc.edu.vn](https://student.husc.edu.vn) và đăng nhập bằng tài khoản của bạn

### Bước 2: Mở DevTools
- Trên Chrome: `F12` hoặc `Ctrl+Shift+I`  
- Chuyển sang tab **Console**

### Bước 3: Dán script
Copy toàn bộ **script.js** và dán vào console → nhấn Enter

### Bước 4: Tải file `.ics`
Sau khi chạy script, một popup sẽ hiện hoặc file sẽ tự động download với tên `timetable.ics`

#### Đối với iOS (iCloud Calendar)
- Đính kèm file `timetable.ics` vào và gửi cho email hiện tại được đăng nhập trên điện thoại (iOS).
- Mở Mail trên điện thoại(iOS), vào tin nhắn được gửi trong mục tin nhắn đến và mở file `timetable.ics`
- Chọn **Thêm vào Lịch** để nhập lịch vào iPhone/iPad.

#### Đối với Google Calendar
- Vào Trang nhập lịch của [Google Calendar](https://calendar.google.com/calendar/u/0/r/settings/export)
- Chọn file `timetable.ics`
- Chọn lịch và nhập lịch

---

## Lưu ý
- UID deterministic được tạo tự động → import nhiều lần không tạo sự kiện trùng lặp.  
- RRULE tuần lặp, thông báo được thiết lập → các lớp học lặp theo tuần và được thông báo trước sự kiện 5 phút.  
- Nếu lịch thay đổi, chỉ cần tạo lại file `.ics` là xong.  

---

> 🎯 Với HUSC-To-Calendar, việc thêm lịch học trở nên cực kỳ nhanh chóng và tiết kiệm thời gian!
