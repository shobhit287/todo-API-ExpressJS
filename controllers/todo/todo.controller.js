const CustomErrorHandler = require("../../customErrorHandler");
const mongoose = require("mongoose");
const TodoService = require("../../service/todo.service");
const { TODO_STATUS } = require("../../enum.constants");
const todoService = new TodoService();

async function create(req, res) {
  try {
    const { body, user } = req;
    body.userId = user.userId;
    return res.status(201).json(await todoService.create(body));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function getAll(req, res) {
  try {
    return res.status(201).json(await todoService.findAll());
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    return res.status(201).json(await todoService.findOne({ _id: id }));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function search(req, res) {
  try {
    const query = req.query;
    return res.status(200).json(await todoService.search(searchToDto(query)));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    return res
      .status(200)
      .json(await todoService.updateOne(id, { status: TODO_STATUS.COMPLETED }));
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function update(req, res) {
   try {
      const { id } = req.params;
      return res
        .status(200)
        .json(await todoService.updateOne(id, req.body));
    } catch (error) {
      if (error instanceof CustomErrorHandler) {
        return res.status(error.statusCode).json(error.message);
      } else {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    }
}

async function deleteTodo(req, res) {
   try {
      const { id } = req.params;
      await todoService.delete(id);
      return res.status(200).json({message: "Todo Deleted Successfully"});
    } catch (error) {
      if (error instanceof CustomErrorHandler) {
        return res.status(error.statusCode).json(error.message);
      } else {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    }
}

function searchToDto(data) {
  const query = {};
  if (data.title) {
    query.title = { $regex: new RegExp(data.title, "i") };
  }
  if (data.description) {
    query.description = { $regex: new RegExp(data.description, "i") };
  }
  if (data.status) {
    query.status = data.status;
  }
  if (data.userId) {
    query.userId = data.userId;
  }

  return query;
}

module.exports = {
  create,
  getAll,
  getById,
  search,
  updateStatus,
  update,
  deleteTodo
};
