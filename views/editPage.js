const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">

    <div>
      <label for="author" class="col-sm-2 control-label">Author</label>
      <div class="col-sm-10">
        <input name="author" type="text" class="form-control" readonly="readonly" value="${author.name}"/>
      </div>
    </div>
    
    <div>
      <label for="email" class="col-sm-2 control-label">E-mail</label>
      <div class="col-sm-10">
        <input name="email" type="text" class="form-control" readonly="readonly" value="${author.email}"/>
      </div>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" readonly="readonly" value="${page.title}"/>
      </div>
    </div>

    <div>
      <label for="content" class="col-sm-2 control-label">Page Content</label>
      <div class="col-sm-10">
        <textarea name="content" rows="10" type="text" class="form-control">${page.content}</textarea>
      </div>
    </div>

    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">submit</button>
    </div>
  </form>
`);
