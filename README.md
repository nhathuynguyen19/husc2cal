# HUSC-To-Calendar

Bạn quá mỏi mệt với việc mỗi lúc đi học lại phải check [thời khóa biểu trên trang tín chỉ](https://student.husc.edu.vn)? Bạn tưởng viết ra và dán lên tường là xong… nhưng bất ngờ chưa, giờ bạn đang đứng giữa trường và không biết nên đi dãy nào, phòng nào…  

Nếu bạn đã thêm lịch vào điện thoại, chúc mừng! Đây là phương pháp tối ưu nhất: thêm 1 lần và sử dụng xuyên suốt học kỳ (ngoại trừ những lúc thầy cô cho nghỉ hoặc thay đổi lịch :>>).  

Nhưng để thêm lịch lần đầu thì khá mất thời gian, cho nên **tool này sẽ giúp bạn tiết kiệm thời gian**, chuyển lịch học từ trang tín chỉ sang **Google Calendar, iCloud Calendar,...** chỉ trong ~1 phút 30 giây.  

Let's dive into it! 🚀

## Các bước thực hiện

### Bước 1: Đăng nhập vào trang tín chỉ
Truy cập [student.husc.edu.vn](https://student.husc.edu.vn) và đăng nhập bằng tài khoản của bạn

<img width="1589" height="740" alt="image" src="https://github.com/user-attachments/assets/cea016f6-0305-444e-8858-22aeab9a106a" />

### Bước 2: Mở DevTools
- Trên Chrome: `F12` hoặc `Ctrl+Shift+I`

<img width="1598" height="749" alt="image" src="https://github.com/user-attachments/assets/55df6d77-b82a-4543-ad34-3fcd280dcb08" />


- Chuyển sang tab **Console**

<img width="786" height="794" alt="image" src="https://github.com/user-attachments/assets/454d1b16-47c0-498f-9820-f412eb843e1f" />


### Bước 3: Dán script
Copy toàn bộ **script.js** và dán vào console → nhấn Enter

<img width="746" height="782" alt="image" src="https://github.com/user-attachments/assets/125a9825-c9ad-4369-9781-91528a35a7cc" />


### Bước 4: Tải file `.ics`
Sau khi chạy script, một popup sẽ hiện hoặc file sẽ tự động download với tên `timetable.ics`

<img width="808" height="492" alt="image" src="https://github.com/user-attachments/assets/575cbec5-a36c-462e-b958-638dee346330" />


#### Đối với iOS (iCloud Calendar)
- Đính kèm file `timetable.ics` vào và gửi cho [email](https://mail.google.com/) hiện tại được đăng nhập trên điện thoại (iOS).

<img width="593" height="580" alt="image" src="https://github.com/user-attachments/assets/938c7c9e-d3c2-40ae-9b10-08cb1c783a23" />

- Mở Mail trên điện thoại(iOS), vào tin nhắn được gửi trong mục Hộp thư đến và mở file `timetable.ics`

<img width="750" height="1334" alt="image" src="https://github.com/user-attachments/assets/e3b4a39d-9ba5-4982-8c8c-fa7f27ea1e6c" />

- Chọn **Thêm vào Lịch** để nhập lịch vào iPhone/iPad.

#### Đối với Google Calendar
- Vào Trang nhập lịch của [Google Calendar](https://calendar.google.com/calendar/u/0/r/settings/export)
- Chọn file `timetable.ics`
- Chọn lịch và nhập lịch

<img width="1002" height="606" alt="image" src="https://github.com/user-attachments/assets/f68b56f6-46ba-4fe8-aa80-1f1be292616c" />

---

## Lưu ý
- UID deterministic được tạo tự động → import nhiều lần không tạo sự kiện trùng lặp.  
- RRULE tuần lặp, thông báo được thiết lập → các lớp học lặp theo tuần và được thông báo trước sự kiện 5 phút.  
- Nếu lịch thay đổi, chỉ cần tạo lại file `.ics` là xong.  

---

> 🎯 Với HUSC-To-Calendar, việc thêm lịch học trở nên cực kỳ nhanh chóng và tiết kiệm thời gian!
