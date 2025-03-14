# APP URL & API URL

- Todo App url: https://react-todo-app-duynhat369.vercel.app/
- Api url: https://todo-api-json-server.vercel.app/api/todos

## Package using:

- axios (REST APIs)
- query-string (stringify params)
- class-names
- node-sass: use sass in react
- react-icons
- react spinners: loading page

### my notes:

- Học cách handle logic + form
- Còn lại em tự handle để show thêm loading khi fetch cái list
  Với mỗi khi mà gọi API, em luôn nhớ phải tìm cách show loading cách này cách khác, để user biết mà đợi
- Form thì add/update dùng chung 1 cái, chứ ko phải tách ra làm 2 như cái cũ của em
- Form thì nhận vào một object có nhiều keys chứ ko phải chỉ một giá trị, vì sau này lỡ thêm fields thì còn mở rộng được.
- Form em để ý nó chỉ có mỗi initialValues và onSubmit thôi, như anh đã nói với em lần trước.
- Dùng arrow function rồi, mà trong hàm có một dòng, thì dùng trực tiếp luôn, thay vì tạo ra một hàm rồi mới gọi (cách cũ của em trong TodoList)
- Trường hợp của em form hơi đặc biệt là nó nằm chung với cái list, nó mount 1 lần, nhưng mấy lần sau có thể update đc value của form, nên phải xử lý hơi phức tạp xíu để support re-initialization
- Ko được query dom element để thêm class, nếu muốn thì tự toggle class theo state nhé.
